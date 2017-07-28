package org.cirmmp.webclientdyn.mds2.chart;

import java.util.ArrayList;

/**
 * Created by andrea on 04/03/2017.
 */
public class arrayBean
{


    ArrayList<String> period = new ArrayList<String>();
    ArrayList<Integer> iphone = new ArrayList<Integer>();
    ArrayList<Integer> ipad = new ArrayList<Integer>();
    ArrayList<Integer> itouch  = new ArrayList<Integer>();
    public ArrayList<String> getPeriod() {
        return period;
    }
    public void setPeriod() {
        period.add("2010 Q1");
        period.add("2010 Q2");
        period.add("2010 Q3");
        period.add("2010 Q4");
        period.add("2011 Q1");
        period.add("2011 Q2");
        period.add("2011 Q3");
        period.add("2011 Q4");
        period.add("2012 Q1");
        period.add("2012 Q2");
    }
    public ArrayList<Integer> getIphone() {
        return iphone;
    }
    public void setIphone() {

        iphone.add(2666);
        iphone.add(2778);
        iphone.add(4912);
        iphone.add(3767);
        iphone.add(6810);
        iphone.add(5670);
        iphone.add(4820);
        iphone.add(15073);
        iphone.add(10687);
        iphone.add(8432);
    }
    public ArrayList<Integer> getIpad() {
        return ipad;
    }
    public void setIpad() {
        ipad.add(0);
        ipad.add(2294);
        ipad.add(1969);
        ipad.add(3597);
        ipad.add(1914);
        ipad.add(4293);
        ipad.add(3795);
        ipad.add(5967);
        ipad.add(4460);
        ipad.add(5713);
    }
    public ArrayList<Integer> getItouch() {
        return itouch;
    }
    public void setItouch() {
        itouch.add(2647);
        itouch.add(2441);
        itouch.add(2501);
        itouch.add(5689);
        itouch.add(2293);
        itouch.add(1881);
        itouch.add(1588);
        itouch.add(5175);
        itouch.add(2028);
        itouch.add(1791);
    }

}

