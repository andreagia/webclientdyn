package org.cirmmp.webclientdyn.mds2.model;


import java.util.ArrayList;
import java.util.List;

/**
 * Created by andrea on 26/05/2017.
 */

public class Prepi {
private List<Atom> atom = new ArrayList<Atom>();

    public List<Atom> getAtom() {
        return atom;
    }

    public void setAtom(List<Atom> atom) {
        this.atom = atom;
    }
}
