import numpy as np

path = "/home/sachin/Documents/CIFDP_FORECAST_2021/"

data = np.loadtxt(path + "Stat_Hs.dat")
print(type(data))
max = np.amax(data)
min = np.amin(data)
#amax, amin
print(max, min)
print("Finished.")