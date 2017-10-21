import os, sys

import tensorflow as tf
import requests
import shutil
import urllib

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# change this as you see fit
#image_path = sys.argv[1]
image_path = "http://www.franchise.co.nz/fimage/url/333/SeriousLambBurger.jpg"
# Read in image at URL (make an HTTP GET request)
###################

#response = requests.get(image_path, stream=True)
#with open('img.jpg', 'wb') as out_file:
#    shutil.copyfileobj(response.raw, out_file)

# Read in the image_data
image_name = urllib.request.urlretrieve(image_path)
image_data = tf.gfile.FastGFile(image_name, 'rb').read()

# Loads label file, strips off carriage return
label_lines = [line.rstrip() for line 
                   in tf.gfile.GFile(os.path.abspath("/Users/DJ/Dropbox/PREWORK_DJ/Code/foodgram/imports/api/Utility/server/retrained_labels.txt"))]

# Unpersists graph from file
with tf.gfile.FastGFile(os.path.abspath("/Users/DJ/Dropbox/PREWORK_DJ/Code/foodgram/imports/api/Utility/server/retrained_graph.pb"), 'rb') as f:
    graph_def = tf.GraphDef()
    graph_def.ParseFromString(f.read())
    tf.import_graph_def(graph_def, name='')

with tf.Session() as sess:
    # Feed the image_data as input to the graph and get first prediction
    softmax_tensor = sess.graph.get_tensor_by_name('final_result:0')
    
    predictions = sess.run(softmax_tensor, \
             {'DecodeJpeg/contents:0': image_data})
    
    # Sort to show labels of first prediction in order of confidence
    top_k = predictions[0].argsort()[-len(predictions[0]):][::-1]
    
    for node_id in top_k:
        human_string = label_lines[node_id]
        score = predictions[0][node_id]
        if (score > .8):
        	print("You chose... ", human_string)
        # print('%s (score = %.5f)' % (human_string, score)
        else:
    	    print("image not recognized")