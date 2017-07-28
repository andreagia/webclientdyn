import os, sys, json, xmltodict
from lxml import etree


def prepi2xml(input):
    prepi = etree.Element("prepi")
    create = 0
    for i in input:
        if create == 1 and len(i) < 1:
            create = 0
        if create == 1:
            a = i.split()
            te = {}
            if len(a) >= 10:
                te['num'] = a[0]
                te['a1'] = a[1]
                te['a2'] = cerca_atom(input, a[4])
                te['a3'] = cerca_atom(input, a[5])
                te['a4'] = cerca_atom(input, a[6])
                te['n1'] = str(int(a[0]) - 3).strip()
                te['n2'] = str(int(a[4]) - 3).strip()
                te['n3'] = str(int(a[5]) - 3).strip()
                te['n4'] = str(int(a[6]) - 3).strip()
                if int(a[4]) > 3:
                    te['bond'] = a[7]
                else:
                    te['bond'] = " "
                if int(a[5]) > 3:
                    te['angle'] = a[8]
                else:
                    te['angle'] = " "
                if int(a[6]) > 3:
                    te['dih'] = a[9]
                else:
                    te['dih'] = " "
                te['charge'] = a[10]
                etree.SubElement(prepi, "atom", te)
        if '3  DUMM  DU    M' in i:
            create = 1
    return prepi

def cerca_atom(input, num):
    create = 0
    if not (num == "1" or num == "2" or num == "3"):
        for i in input:

            if create == 1 and len(i) < 1:
                create = 0

            if create == 1:
                a = i.split()
                if a[0] == num:
                    return a[1]

            if '3  DUMM  DU    M' in i:
                create = 1
    else:
        return " "

mol_prepi= sys.argv[1]

te = {}
if os.path.exists(mol_prepi):
    f_prep = open(mol_prepi, 'r')
    s_prepi = f_prep.readlines()
    tree = prepi2xml(s_prepi)

else:
    te['charge'] = charge
    te['res_name'] = res_name
    te['status_err'] = "true"
    tree = etree.Element("prepi")
    etree.SubElement(tree, "info", te)


ndoc = etree.tostring(tree,pretty_print=True)

print ndoc

o = xmltodict.parse(ndoc)

#print json.dumps(o)

with open('prepi.json', 'w') as outfile:
    json.dump(o, outfile)