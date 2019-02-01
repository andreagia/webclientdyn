const Checkpdb =(stringin) => {

    let pdb = {};
    pdb.pdbvec = [];
    pdb.pdbtex = "";
    pdb.errors = [];
    pdb.structure = {};
    pdb.structure.chains =[];

    if(stringin) {
        pdb.pdbvec = stringin.split('\n').map(s => s.slice(0,54));
        let pnum = 'xxxx';
        let chains = [];
        let chain = {};
        let chain_count = 0;
        let residues = [];
        let residue = {};
        let rescoord = [];
        let findter = false;
        let findend = 0;
        for ( let iter of pdb.pdbvec ){
            if (iter.slice(0,6).trim() === 'ATOM' ){
                if (iter.slice(22,26).trim() !== pnum){
                    residue.coord = [...rescoord];
                    residue.name = iter.slice(17,20).trim();
                    if (pnum !== 'xxxx') residues.push({...residue});
                    //  console.log("RESIDUE PRIMA",residue);
                    //  console.log("RESIDUE COORD",residue.coord);
                    delete residue.coord;
                    delete residue.name;
                    rescoord = [];
                    //   console.log('##### INI #####');
                    //   console.log("RESIDUE",residue);
                    //   console.log('RESCOORD',rescoord);
                    //   console.log('##### END ######');
                    rescoord.push(iter);
                    //   console.log("RESIDUES ---> ",residues);
                    pnum = iter.slice(22,26).trim();
                } else {
                    rescoord.push(iter);
                }
            } else if (iter.slice(0,6).trim() === 'TER'){
                chain_count += 1;
                chain.name = chain_count;
                chain.residues = [...residues];
                residues = [];
                chains.push({...chain});
                // console.log(chains);
                delete chain.name;
                delete chain.residues;
                findter = true;
            } else if (iter.slice(0,6).trim() === 'END'){
                findend += 1;
            }
        }
        pdb.structure.chains = [{...chains}];

        if (!findter) pdb.errors.push("TER not prsent in pdb");
        if (findend === 0) pdb.errors.push("END not present in pdb");
        if (findend  > 1) pdb.errors.push("more then one END present in pdb");
        pdb.pdbtex = pdb.pdbvec.join("\n");
        console.log("PDB FINALE",pdb);
        return pdb;

    }

};
export default Checkpdb;