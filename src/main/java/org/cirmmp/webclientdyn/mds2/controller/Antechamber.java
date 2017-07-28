package org.cirmmp.webclientdyn.mds2.controller;

import org.apache.commons.io.FileUtils;
import org.cirmmp.webclientdyn.mds2.model.Atom;
import org.cirmmp.webclientdyn.mds2.model.FormAntechamber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.validation.Valid;
import java.io.*;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by andrea on 23/05/2017.
 */
@Controller
public class Antechamber {

    private static final Logger logger = LoggerFactory.getLogger(Antechamber.class);

    @Autowired
    ServletContext context;
    /**
     * Upload single file using Spring Controller
     */


    @RequestMapping(value = "/uploadAnte", method = RequestMethod.GET)
    public String uploadAnteGet( ModelMap model) {
        logger.info("Returning custSave.jsp page");
        model.addAttribute("formantechamber", new FormAntechamber());
        return "upload";
    }

    @RequestMapping(value = "/uploadAnte", method = RequestMethod.POST)
    public String uploadAntePost(@Valid @ModelAttribute("formantechamber") FormAntechamber formantechamber,
                                 @RequestParam(value = "file", required = false) MultipartFile file,BindingResult result, ModelMap model) {
        if (result.hasErrors()) {
            return "error";
        }
        String antepdbn = context.getRealPath("/html/tmp/ante.pdb");
        List<Atom> invItem = new ArrayList<>();
        //MultipartFile file = file_name.getFile();
        if (!file.isEmpty()) {
            try {
                byte[] bytes = file.getBytes();
                // Creating the directory to store file
                String rootPath = System.getProperty("catalina.home");
                logger.info("ROOTPATH");
                logger.info(rootPath);
                File dir = new File(rootPath + File.separator + "tmpFiles");
                if (!dir.exists())
                    dir.mkdirs();
                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath()
                        + File.separator + file.getOriginalFilename());
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();
                logger.info("Server File Location="
                        + serverFile.getAbsolutePath());
                String amberpath="/usr/local/amber16";
                File script = new File(rootPath+File.separator+"webapps/ROOT/WEB-INF/classes/script/runAntechamber.sh");
                File pythonprepi = new File(rootPath+File.separator+"webapps/ROOT/WEB-INF/classes/script/prepiTojson.py");
                String command = String.format("/bin/bash %s %s %s %s %s %s %s %s",script,dir,formantechamber.getType_in()
                        , serverFile.getAbsolutePath(), formantechamber.getCharge_type(),formantechamber.getCharge(),formantechamber.getRes_name(),pythonprepi);

//                String command = String.format("cd %s ;%s/bin/antechamber -fi %s -i %s -fo prepi -o mol.prepi -c %s -nc %s -rn %s -pf yes", dir.getAbsolutePath(),amberpath,formantechamber.getType_in()
//                        , serverFile.getAbsolutePath(), formantechamber.getCharge_type(),formantechamber.getCharge(),formantechamber.getRes_name());
                System.out.println(command);
                String output = this.executeCommand(command);
                System.out.println(output);
                File antepdb = new File(antepdbn);

                FileUtils.copyFile(serverFile, antepdb);
                // convertire json to object http://websystique.com/java/json/jackson-convert-java-object-to-from-json/
                try
                {
                    logger.info("Open json prepi.json");
                    File f = new File(rootPath + File.separator +"tmpFiles/mol.prepi");
                    List<String> lines = FileUtils.readLines(f, "UTF-8");
                    for (String line : lines) {
                        String[] tokenize = line.split("\\s+");
                        if (tokenize.length == 12 && isInteger(tokenize[1])){
                            if(!tokenize[2].equals("DUMM")){
                                if(Integer.parseInt(tokenize[5]) >= 3){
                                    Atom tempObj = new Atom();
                                    tempObj.setNum(tokenize[1]);
                                    tempObj.setN1(Integer.parseInt(tokenize[1]));
                                    tempObj.setN2(Integer.parseInt(tokenize[5]));
                                    tempObj.setN3(Integer.parseInt(tokenize[6]));
                                    tempObj.setN4(Integer.parseInt(tokenize[7]));
                                    tempObj.setA1(tokenize[2]);
                                    tempObj.setA2(findAtom(lines,tokenize[5]));
                                    tempObj.setA3(findAtom(lines,tokenize[6]));
                                    tempObj.setA4(findAtom(lines,tokenize[7]));
                                    tempObj.setBond(tokenize[8]);
                                    tempObj.setAngle(tokenize[9]);
                                    tempObj.setDih(tokenize[10]);
                                    tempObj.setCharge(tokenize[11]);
                                    // add to array list
                                    invItem.add(tempObj);
                                }
                            }
                        }
                    }
                }
                // handle exceptions
                catch (FileNotFoundException fnfe)
                {
                    System.out.println("file not found");
                }
                catch (IOException ioe)
                {
                    ioe.printStackTrace();
                }
                //return "You successfully uploaded file=" + file.getOriginalFilename();
            } catch (Exception e) {
                result.reject(e.getMessage());
                return "redirect:/uploadAnte";
            }
        } else {
            return "You failed to upload " + file.getName()
                    + " because the file was empty.";
        }
        for(Atom at: invItem){
            System.out.println(at.toString());
        }

        model.addAttribute("atoms",invItem);
        //model.addAttribute("antepdbn",antepdbn);
        return "upload";
    }

    public  static String findAtom  (List<String> ls, String st) {
        System.out.println("findAtom");
        for (String l : ls) {
            String[] tokenize = l.split("\\s+");
            if (tokenize.length == 12 && isInteger(tokenize[1])) {
                System.out.println(tokenize[1]+" " +st);
                if(tokenize[1].equals(st)){
                    System.out.println("Trovato");
                    return tokenize[2];
                }
            }
        }
        return "";
    }

    public static boolean isInteger(String s) {
        boolean isValidInteger = false;
        try
        {
            Integer.parseInt(s);
            // s is a valid integer
            isValidInteger = true;
        }
        catch (NumberFormatException ex)
        {
            // s is not an integer
        }
        return isValidInteger;
    }


    private String executeCommand(String command) {

        StringBuffer output = new StringBuffer();

        Process p;
        try {
            p = Runtime.getRuntime().exec(command);
            p.waitFor();
            BufferedReader reader =
                    new BufferedReader(new InputStreamReader(p.getInputStream()));

            String line = "";
            while ((line = reader.readLine())!= null) {
                output.append(line + "\n");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return output.toString();

    }


    /**
     * Upload multiple file using Spring Controller
     */
    @RequestMapping(value = "/uploadMultipleFile", method = RequestMethod.POST)
    public @ResponseBody
    String uploadMultipleFileHandler(@RequestParam("name") String[] names,
                                     @RequestParam("file") MultipartFile[] files) {

        if (files.length != names.length)
            return "Mandatory information missing";

        String message = "";
        for (int i = 0; i < files.length; i++) {
            MultipartFile file = files[i];
            String name = names[i];
            try {
                byte[] bytes = file.getBytes();

                // Creating the directory to store file
                String rootPath = System.getProperty("catalina.home");
                File dir = new File(rootPath + File.separator + "tmpFiles");
                if (!dir.exists())
                    dir.mkdirs();

                // Create the file on server
                File serverFile = new File(dir.getAbsolutePath()
                        + File.separator + name);
                BufferedOutputStream stream = new BufferedOutputStream(
                        new FileOutputStream(serverFile));
                stream.write(bytes);
                stream.close();

                logger.info("Server File Location="
                        + serverFile.getAbsolutePath());

                message = message + "You successfully uploaded file=" + name
                        + " ";
            } catch (Exception e) {
                return "You failed to upload " + name + " => " + e.getMessage();
            }
        }
        return message;
    }
}