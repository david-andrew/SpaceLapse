%% add alpha channel to earth clouds image
A = imread('2k_earth_clouds.jpg');
%B = cat(3, A(:,:,1), A(:,:,2), A(:,:,3), zeros([1024 2048], 'uint8'));
alpha = zeros([1024 2048], 'uint8');

for i = 1:1024
    for j = 1:2048
        alpha(i,j) = uint8((mean(double(squeeze(A(i,j,:))))));
    end
end

imwrite(imadjust(A), '2k_earth_clouds_trans.png', 'Alpha', alpha);