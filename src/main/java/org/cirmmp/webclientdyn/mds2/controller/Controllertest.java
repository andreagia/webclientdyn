package org.cirmmp.webclientdyn.mds2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by andrea on 27/04/2017.
 */
@Controller
@RestController
public class Controllertest {

    @CrossOrigin
    @RequestMapping(value="/test",method = RequestMethod.GET)
    public String rmShell(){
        return "/WEB-INF/views/helloworld.jsp";
    }


}
