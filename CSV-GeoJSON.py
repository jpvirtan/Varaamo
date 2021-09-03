import csv
import geojson
print("All libraries succesfully imported")

inpath = "Linkit.csv"
outpath = "Linkit.geojson"

reader = open(inpath, 'r')
parser = csv.reader(reader, delimiter=';')
kohdejoukko = []
i = 0 #Stores row index

for row in parser:
    if i != 0:
        piste = geojson.Point((float(row[5]), float(row[6])))
        kohde = geojson.Feature(geometry=piste, properties={"name":row[1], "facility": row[0], "matterport": row[2], "varaamo": row[3], "servicemap": row[4], "id": row[7]})
        kohdejoukko.append(kohde)
    i = i+1
reader.close()

kokoelma = geojson.FeatureCollection(kohdejoukko)

writer = open(outpath,'w')
writer.write(geojson.dumps(kokoelma, indent=1))
writer.close()
