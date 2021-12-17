import numpy as np

PI = np.pi
EARTH_R = 6371 # Earth radius in km

def deg2rad(d):
    'Convert degrees to radians'
    return d * (PI / 180)

def distance(a, b):
    ''' 
    Use the Haversine formula to calculate the distance between two coordinates a & b
    a, b: (float, float) (latitude, longitude)
    '''
    a_lat, a_lon, b_lat, b_lon = a[0], a[1], b[0], b[1]
    d_lat = deg2rad(b_lat - a_lat)
    d_lon = deg2rad(b_lon - a_lon)

    a = np.sin(d_lat / 2)**2 + np.cos(deg2rad(a_lat)) * np.cos(deg2rad(b_lat)) * np.sin(d_lon / 2) * np.sin(d_lon / 2)
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    distance = EARTH_R * c
    return distance

def get_closest(points):
    'Get point closest to all other points'
    sum_dist = {}
    for point in points:
        sum_dist[point] = np.mean([distance(point, other) for other in points])
    return min(sum_dist, key=sum_dist.get)