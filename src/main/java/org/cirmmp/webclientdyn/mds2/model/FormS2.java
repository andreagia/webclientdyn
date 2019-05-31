package org.cirmmp.webclientdyn.mds2.model;

/**
 * Created by andrea on 20/04/2017.
 */
public class FormS2 {
    private String[] fileNC;
    private String filePDB;
    private String wildc;

    public void setFileNC(String[] fileNC) {
        this.fileNC = fileNC;
    }

    public String[] getFileNC() {
        return fileNC;
    }

    public String getFilePDB() {
        return filePDB;
    }

    public void setFilePDB(String filePDB) {
        this.filePDB = filePDB;
    }

    public String getWildc() {
        return wildc;
    }

    public void setWildc(String wildc) {
        this.wildc = wildc;
    }
}
