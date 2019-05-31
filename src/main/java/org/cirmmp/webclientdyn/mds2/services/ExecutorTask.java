package org.cirmmp.webclientdyn.mds2.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

class ExecutorTask implements Runnable{

    private String[] command;
    public ExecutorTask(String[] command){
        this.command = command;
    }

    @Override
    public void run() {

        Process process = null;
        try {
            process = Runtime.getRuntime().exec(this.command);
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line="";
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            process.waitFor();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            return;
        }
    }
}