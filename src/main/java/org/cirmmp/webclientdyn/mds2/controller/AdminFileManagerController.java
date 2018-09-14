package org.cirmmp.webclientdyn.mds2.controller;

//import com.cloudcenturion.gdprlogin.rfm.error.FileManagerException;
//import com.cloudcenturion.gdprlogin.rfm.impl.LocalFileManager;
import org.cirmmp.webclientdyn.rfm.error.FileManagerException;
import org.cirmmp.webclientdyn.rfm.impl.LocalFileManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping(value = "/admin/fileManager")
public class AdminFileManagerController {

    private static final Logger logger = LoggerFactory.getLogger(AdminFileManagerController.class);

    @RequestMapping(value = "", method = RequestMethod.GET)
    public String index(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws IOException {
        //content of the index.html in the (JS) plugin's folder
        return "home.html";
    }

    @RequestMapping(value = "/api")
    public void fm(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws IOException, FileManagerException {
        new LocalFileManager().handleRequest(request, response);
    }
    @RequestMapping(value = "fm/api")
    public void fmapi(ModelMap model, HttpServletRequest request, HttpServletResponse response) throws IOException, FileManagerException {
        Map<String,String> options = new HashMap<>();
        options.put("propertyName", "value");
        logger.info("localFileManager");
        new LocalFileManager(options).handleRequest(request, response);
    }
}