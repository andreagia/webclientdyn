package org.cirmmp.webclientdyn.mds2.chart;

import java.util.List;

/**
 * Created by andrea on 04/03/2017.
 */
public class FileS2 {
    private List<String> res;
    private List<String> s2;

    public FileS2(){
        super();
    }
    public FileS2(List Res,List S2){
        super();
        res =Res;
        s2=S2;
    }

    public List<String> getRes() {
        return res;
    }

    public void setRes(List<String> res) {
        this.res = res;
    }

    public void setS2(List<String> s2) {
        this.s2 = s2;
    }

    public List<String> getS2() {

        return s2;
    }

}
