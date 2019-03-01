package org.cirmmp.webclientdyn.mds2.controller;

import org.cirmmp.webclientdyn.mds2.model.Backtxt;
import org.cirmmp.webclientdyn.mds2.model.FormS2;
import org.cirmmp.webclientdyn.mds2.services.RunAnalysis;
import org.cirmmp.webclientdyn.mds2.services.RunAsync;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

@Controller
@org.springframework.web.bind.annotation.RestController
@RequestMapping(value = "/react")
public class RestController {

    Logger logger = LoggerFactory.getLogger(RestController.class);
    @Autowired
    ServletContext context;
    @Autowired
    RunAnalysis runAnalysis;


    @Autowired
    RunAsync runAsync;

    @RequestMapping(value="runShellS2", method = RequestMethod.POST)
    public String runShell(@RequestBody FormS2 formS2, HttpServletRequest request) throws Exception {
        logger.info("----RISULTATI--------");
        logger.info(formS2.getFileNC());
        logger.info(formS2.getFilePDB());
        logger.info("----RISULTATI--------");
        String fullPath = context.getRealPath("/resources/script/create_bv_inpt.py");
        logger.info("PATH PYTHON " + fullPath);
        String filemanagerpath = context.getRealPath("/html/filemanager");
        logger.info("FILEMANAGER PATH - > "+ filemanagerpath);
        String dataPath = context.getRealPath("/html/tmp");
        logger.info("DATA PATH - > "+ dataPath);
        String path = fullPath.substring(0, fullPath.lastIndexOf("/")+1);
        String webinf = fullPath.substring(0, fullPath.lastIndexOf("WEB-INF")+7);

        String pathouput = filemanagerpath+"/S2OUTPUT";
        // create output on filemanager directories
        Path pathresult = Paths.get(pathouput);
        //if directory exists?
        if (!Files.exists(pathresult)) {
            try {
                Files.createDirectories(pathresult);
            } catch (IOException e) {
                //fail to create directory
                e.printStackTrace();
            }
        }
        String pdbfile = formS2.getFilePDB().substring(formS2.getFilePDB().lastIndexOf("filemanager") + 11);
        String parse3 = filemanagerpath +"/"+ formS2.getFileNC();
        String parse4 = filemanagerpath + pdbfile;
        logger.info("Parse3 "+parse3+" parse4 "+ parse4);
        String command_run = "/bin/bash " + path + "runcpptraj.sh "+ path + " " + pathouput + " " + parse3 + " "+ parse4;
        logger.info("COMMAND RUN -> "+command_run);
        logger.info(webinf);
        logger.info("DATAPATH");
        logger.info(dataPath);

        //Future<String> page1 = runAnalysis.executeCommand("traceroute www.google.com");
        Future<String> page1 = runAnalysis.executeCommand(command_run);
        logger.info("execute");

        String risp = "pippo";

        if (page1.isDone()) {
            risp = page1.get(1L, TimeUnit.SECONDS);
            logger.info("FINITO");
        } else {
            logger.info("ASPETTO");
            risp = "sta' girando";
        }

        logger.info(risp);

        logger.info("ESCO");

        ModelAndView model = new ModelAndView("/WEB-INF/views/helloworld.jsp");
        model.addObject("msg", risp);

        return "redirect:/html/adm/pages/morris.html";
        //return model;
    }

    @RequestMapping(value="checkrun", method = RequestMethod.GET)
    public ResponseEntity<?> checkrun () {

        String filePath = "/tmp/mds2/mds2.out";
        StringBuilder contentBuilder = new StringBuilder();

        Backtxt backtxt = new Backtxt();

        if (Files.exists(Paths.get(filePath))) {
            try (Stream<String> stream = Files.lines(Paths.get(filePath), StandardCharsets.UTF_8)) {
                stream.forEach(s -> contentBuilder.append(s).append("\n"));
                backtxt.setInfo("OK");
            } catch (IOException e) {
                e.printStackTrace();
                backtxt.setInfo("ERROR");
            }
            backtxt.setText(contentBuilder.toString());
        } else {
            backtxt.setInfo("ERROR");
        }

        String filePathjson = "/tmp/mds2/tmp/iredout_s2";

        StringBuilder contentBuilderjson = new StringBuilder();
        if (Files.exists(Paths.get(filePathjson))) {
            try (Stream<String> streamjson = Files.lines(Paths.get(filePathjson), StandardCharsets.UTF_8)) {
                streamjson.forEach(s -> contentBuilderjson.append(s).append("\n"));
                backtxt.setInfo("OK");
            } catch (IOException e) {
                e.printStackTrace();
                backtxt.setInfo("ERROR");
            }
            backtxt.setIredout(contentBuilderjson.toString());
        }

        return new ResponseEntity(backtxt, HttpStatus.OK);

    }

}
