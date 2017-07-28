package org.cirmmp.webclientdyn.mds2.services;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@Service
public class RunAsync{
    Logger logger = LoggerFactory.getLogger(RunAsync.class);


    @Async("taskExecutor")
    public String doSlowWork(String command) {

        StringBuffer output = new StringBuffer();

        logger.info("PARTITO - esterno");


        logger.info("Start  slow work");
        try {

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


            Thread.sleep(30);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        logger.info("finish slow work");

//    return "forward:/another";  // forward to another url
        return "helloworld";       // return view's name
    }


}