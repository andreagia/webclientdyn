package org.cirmmp.webclientdyn.mds2.controller;


import com.google.gson.Gson;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.WildcardFileFilter;
import org.cirmmp.webclientdyn.mds2.chart.FileS2;
import org.cirmmp.webclientdyn.mds2.chart.arrayBean;
import org.cirmmp.webclientdyn.mds2.model.FormS2;
import org.cirmmp.webclientdyn.mds2.services.RunAnalysis;
import org.cirmmp.webclientdyn.mds2.services.RunAsync;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;


@Controller
@RequestMapping("/service")
public class Access  {

    Logger logger = LoggerFactory.getLogger(Access.class);

    @Autowired
    RunAnalysis runAnalysis;


    @Autowired
    RunAsync runAsync;

    @Autowired
    ServletContext context;

    /*@RequestMapping("helloAsync")
    public Callable<String> sayHelloAsync() {
        logger.info("Entering controller");

        Callable<String> asyncTask = new Callable<String>() {

            @Override
            public String call() throws Exception {
                return runAsync.doSlowWork("traceroute www.google.com");
            }
        };

        logger.info("Leaving  controller");
        return asyncTask;
    }*/


    @RequestMapping(value="rmShell",method = RequestMethod.GET)
    public String rmShell() throws Exception {

        String dataPath = context.getRealPath("/html/tmp");
        logger.info("RIMUOVO DATA");
        String[] command_rm =new String[]{ "rm" , dataPath +"/prot.pdb", dataPath +"/ired_res.json", "/tmp/mds2/mds2.out"};
       logger.info(String.join(" ",command_rm ));
        Future<String> page1 = runAnalysis.executeCommand(command_rm);

        String risp = "";

        if (page1.isDone()) {
            risp = page1.get(1L, TimeUnit.SECONDS);

            logger.info("FINITO");
        } else {
            logger.info("ASPETTO");
            risp = "sta' girando";
        }

        return "redirect:/html/adm/pages/morris.html";
    }

    @RequestMapping(value="runShellS2", method = RequestMethod.POST)
    public String runShell(@RequestBody FormS2 formS2, HttpServletRequest request) throws Exception {

        logger.info("----RISULTATI--------");
        List<String> fileNclist = Arrays.asList(formS2.getFileNC());
        fileNclist.forEach(a->logger.info(a));

        logger.info(formS2.getFilePDB());
       // Collections.sort(fileNclist);
        String fileNCVar = String.join(" ", fileNclist);
        logger.info("----RISULTATI--------");
        String fullPath = context.getRealPath("/resources/script/create_bv_inpt.py");
        logger.info("PATH PYTHON " + fullPath);
        String dataPath = context.getRealPath("/html/tmp");
        String path = fullPath.substring(0, fullPath.lastIndexOf("/")+1);
        String webinf = fullPath.substring(0, fullPath.lastIndexOf("WEB-INF")+7);

        logger.info("SONO IN");
        String command_run1 =" arraync=(" + fileNCVar + ") ; . " + path + "runcpptraj.sh "+ path + " " + dataPath + " arraync[@] "+ formS2.getFilePDB() ;
        String[] command_run =  new String[]{"bash", "-c", command_run1};

       // logger.info(command_run);
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


    File CheckOnedataDir(String inDir){

        File[] directories = new File(inDir).listFiles(new FileFilter() {
            @Override
            public boolean accept(File file) {
                return file.isDirectory();
            }
        });

        logger.info("----CHECK ONEDATA DIR------");
        logger.info(inDir);
        logger.info(directories[0].toString());
        logger.info(String.valueOf(directories.length));

        if (directories.length == 1) {
             File dir = new File(directories[0].toString() + "/MDAnalysis");
            if (!dir.exists()) {
                dir.mkdir();
            }
            return dir;
        } else {
            File dir = new File(inDir+"/MDAnalysis");
            if (!dir.exists()) {
                dir.mkdir();
            }
            return dir;
        }
    }

    @RequestMapping(value = "/getoutput", method=RequestMethod.GET)
    @ResponseBody
    public String getOutput(HttpServletResponse response){
        response.setContentType("text/plain"); 	 response.setCharacterEncoding("UTF-8");

        String filePath = "/tmp/mds2/mds2.out";
        StringBuilder contentBuilder = new StringBuilder();
        try (Stream<String> stream = Files.lines( Paths.get(filePath), StandardCharsets.UTF_8))
        {
            stream.forEach(s -> contentBuilder.append(s).append("\n"));
        }
        catch (IOException e)
        {
            //String stackTrace = Throwables.getStackTraceAsString(e);
            //logger.info(stackTrace);
            return "Output not yet created";
            //logger.info(e.printStackTrace().to);

        }

        return contentBuilder.toString();
    }

    @RequestMapping(value = "/getfilesnameNC")
    public @ResponseBody
    String GetFilesNameNC()  {

        logger.info("----GETFILENC------ INI");
       // logger.info(CheckOnedataDir("/tmp/onedata").toString());
        logger.info("----GETFILENC------ END");

        File root = new File("/tmp/onedata");

        ArrayList filPaths = new ArrayList();
        try {
            String[] extensions = {"nc"};
            boolean recursive = true;

            // Finds files within a root directory and optionally its
            // subdirectories which match an array of extensions. When the
            // extensions is null all files will be returned.
            //
            // This method will returns matched file as java.io.File
            Collection files = FileUtils.listFiles(root, extensions, recursive);

            for (Iterator iterator = files.iterator(); iterator.hasNext();) {
                File file = (File) iterator.next();
                filPaths.add(file.getAbsolutePath());
                System.out.println("File = " + file.getAbsolutePath());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        /*File dir = CheckOnedataDir("/tmp/onedata");
        if (! dir.exists()){
            dir.mkdir();
            // If you require it to make the entire directory path including parents,
            // use directory.mkdirs(); here instead.
        }
        FileFilter fileFilter = new WildcardFileFilter("*.nc");
        File[] files = dir.listFiles(fileFilter);

        for (File file : files) {
            if (file.isFile()) {
                System.out.println(file.getName());
            }
        }
        ArrayList filPaths = new ArrayList();
        for (File file : files) {
            filPaths.add(file.getAbsolutePath());
        }*/
        //return filPaths;
        Gson gson = new Gson();
        logger.info("GETFILESNAME");
        Collections.sort(filPaths);
        logger.info(filPaths.toString());
        return gson.toJson(filPaths);
    }

    @RequestMapping(value = "/getfilesnamePDB")
    public @ResponseBody
    String GetFilesNamePDB() {

/*
        File dir = CheckOnedataDir("/tmp/onedata");
        FileFilter fileFilter = new WildcardFileFilter("*.pdb");
        File[] files = dir.listFiles(fileFilter);

        ArrayList filPaths = new ArrayList();
        for (File file : files) {
            filPaths.add(file.getAbsolutePath());
        }*/
        //return filPaths;

        File root = new File("/tmp/onedata");
        ArrayList filPaths = new ArrayList();
        try {
            String[] extensions = {"pdb"};
            boolean recursive = true;

            // Finds files within a root directory and optionally its
            // subdirectories which match an array of extensions. When the
            // extensions is null all files will be returned.
            //
            // This method will returns matched file as java.io.File
            Collection files = FileUtils.listFiles(root, extensions, recursive);

            for (Iterator iterator = files.iterator(); iterator.hasNext();) {
                File file = (File) iterator.next();
                filPaths.add(file.getAbsolutePath());
                System.out.println("File = " + file.getAbsolutePath());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        Gson gson = new Gson();
        logger.info("GETFILESNAME");
        logger.info(filPaths.toString());
        return gson.toJson(filPaths);
    }

    @RequestMapping(value = "/dashboard")
    public @ResponseBody
    String ShowUserDetails()  {


        String webinf = context.getRealPath("/html/tmp");
        Gson gson = new Gson();

        FileS2 s2 = new FileS2();

        try {
            File f = new File(webinf+"/ired_res.json");
            if(f.exists()){
                FileReader filein = new FileReader(webinf+"/ired_res.json");
                s2 = gson.fromJson(filein, FileS2.class);
            }else {
                logger.info("ired_res.json NOT YET CREATED");
            }
        } catch (FileNotFoundException ex) {
            ex.printStackTrace();
        } catch (IOException ex2) {
            ex2.printStackTrace();
        }
        String jsonString = gson.toJson(s2);
        logger.info("JSON");
        logger.info(jsonString);


        return gson.toJson(s2);
    }

    @RequestMapping(value = "/dashboard1")
    public @ResponseBody
    String ShowUserDetails1() {
        Gson gson = new Gson();
        arrayBean o1 = new arrayBean();
        o1.setPeriod();
        o1.setIpad();
        o1.setIphone();
        o1.setItouch();

        String jsonString = gson.toJson(o1);
        logger.info("JSON");
        logger.info(jsonString);

        return gson.toJson(o1);
    }


}