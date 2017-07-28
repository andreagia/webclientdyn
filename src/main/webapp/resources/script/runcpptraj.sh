#!/usr/bin/env bash
SOURCE="${BASH_SOURCE[0]}"
SCRIPT=${1}
WEBINF=${2}
FILENC=${3}
FILEPDB=${4}
DINPUT=/tmp/mds2

if [ ! -d $DINPUT ]; then
  mkdir -p $DINPUT;
fi

export AMBERHOME=/usr/local/amber16
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$AMBERHOME/lib

if pgrep -x "ccptraj" > /dev/null
then
    echo "Running"

else
    if [ -d "$DINPUT/tmp" ];
     then
        rm -rf $DINPUT/tmp/*
        mkdir $DINPUT/tmp/
        cd $DINPUT/tmp
    else
        mkdir $DINPUT/tmp/
        cd $DINPUT/tmp
    fi

    python $SCRIPT/create_bv_inpt.py -v nh -p $FILEPDB -t $FILENC > $DINPUT/mds2.in
    $AMBERHOME/bin/cpptraj -i $DINPUT/mds2.in
    python $SCRIPT/csv2json.py
    cp $FILEPDB $WEBINF/prot.pdb
    cp $DINPUT/tmp/ired_res.json $WEBINF


fi

