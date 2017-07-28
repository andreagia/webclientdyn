#!/usr/bin/env bash
DWORK=${1}
FTIN=${2}
FIN=${3}
CT=${4}
CA=${5}
RN=${6}
PY=${7}
export AMBERHOME=/usr/local/amber16
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$AMBRHOME/lib

cd $DWORK
$AMBERHOME/bin/antechamber -fi $FTIN -i $FIN -fo prepi -o mol.prepi -c $CT -nc $CA -rn $RN -pf yes

python $PY mol.prepi

