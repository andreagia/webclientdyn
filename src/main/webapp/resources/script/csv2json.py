import csv
import json

file = open('iredout_s2', 'r')
dict ={}

res = []
s2 =[]
for i in file :
    if i[0] != "#":
        res.append(i.split()[0])
        s2.append(i.split()[1])

dict['res'] = res
dict['s2'] = s2

with open('ired_res.json', 'w') as fp:
    json.dump(dict, fp)




