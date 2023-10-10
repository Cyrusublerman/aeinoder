convolutional neural networks

 a filter that you pass over an image that can spot features

compare pixels to their neighbour

create a 3x3 grid and apply multipliers to each pixel in grid

when combined with pooling (a way of compressing) it is powerful

quarters the size of the image



Conv2D 
2d convolution layer

The parameters are:

1. The number of convolutions you want to generate. The value here is purely arbitrary but it's good to use powers of 2 starting from 32.
2. The size of the Convolution. In this case, a 3x3 grid.
3. The activation function to use. In this case, you used a ReLU, which you might recall is the equivalent of returning `x` when `x>0`, else return `0`.
4. In the first layer, the shape of the input data.

MaxPooling2D
Downsamples the input along its spacial dimensions by taking the max value over an input window. compresses the image whilst keeping the features highlighted by the convolution. 



model.summary() 
shows journey of the model

28x28->26x26 because you need 3x3 grid for convolution, therefore you lose a 1px border. 

pooling quarters so 26x26->13x13
then conv 13x13->11x11
then 11x11->5x5