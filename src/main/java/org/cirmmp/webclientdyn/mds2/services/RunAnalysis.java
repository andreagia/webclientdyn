package org.cirmmp.webclientdyn.mds2.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.Future;

/**
 * Created by andrea on 28/02/2017.
 */
@Service
public class RunAnalysis  {

    Logger logger = LoggerFactory.getLogger(RunAnalysis.class);


    /*@Async
    public String doSlowWork() {
        logger.info("Start  slow work");

        String domainName = "google.com";
        String command = "host -t a " + domainName;

        String output = this.executeCommand(command);


        logger.info("finish slow work");
//    return "forward:/another";  // forward to another url
        return "helloworld";       // return view's name
    }
*/
    @Async("taskExecutor")
    public Future<String> executeCommand(String command) throws InterruptedException {


        ExecutorTask task = new ExecutorTask(command);
        Thread executorThread = new Thread(task);
        executorThread.start();


       /* Map<String, String> env = System.getenv();
        for (String envName : env.keySet()) {
            System.out.format("%s=%s%n", envName, env.get(envName));
        }
*/
       /* StringBuffer output = new StringBuffer();

        logger.info("PARTITO - esterno");
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
        }*/

        return new AsyncResult<>("partito");

    }

}
