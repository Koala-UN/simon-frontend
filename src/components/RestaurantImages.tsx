import React, { useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAuth } from '../utils/getContext';
import { Button } from '@material-tailwind/react';

interface Image {
    url: string;
}
interface RestaurantImagesProps {
    images: Image[];
    setImages: React.Dispatch<React.SetStateAction<Image[]>>;
}

const RestaurantImages = ({ images, setImages}: RestaurantImagesProps) => {
    const { user, setIsLoading } = useAuth();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/${user.id}/img`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                const data = await response.json();
                setImages(data);
                console.log("llegaron las imagenes: ", data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [setImages, user.id]);

    const moveImage = (dragIndex: number, hoverIndex: number) => {
        const updatedImages = [...images];
        const [draggedImage] = updatedImages.splice(dragIndex, 1);
        updatedImages.splice(hoverIndex, 0, draggedImage);
        setImages(updatedImages);
    };

    const deleteImage = async (imgUrl: string) => {
        try {

            const publicId = imgUrl.split('/').pop()?.split('.')[0] || ''; // Extraer el publicId de la URL
            console.log("Borrando imagen: ", imgUrl);
            //console.log("url: ", `${import.meta.env.VITE_BACKEND_URL}/api/restaurant/${user.id}/img/${imageId}`);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/${user.id}/img/${publicId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Error deleting image');
            } else {
                console.log("Imagen borrada: ", imgUrl);
                setImages(images.filter(image => image.url !== imgUrl));
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    const handleAddImages = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) {
            return;
        }

        if (files.length > 10) {
            alert('No puedes subir más de 10 imágenes a la vez.');
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/restaurant/${user.id}/images/restaurant`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error uploading images');
            } else {

                const data = await response.json();


                const newImgs = data.map((img: Image) => {
                    const d = { url: img };
                    console.log("d: ", d
                    );
                    return d;
                });
                setImages([...images, ...newImgs]);
                console.log("Imágenes agregadas: ", data);
                console.log("Imágenes actuales: ", images);
            }

        } catch (error) {
            console.error('Error uploading images:', error);
        }
        setIsLoading(false);
    };

    return (
        <>
            <label className="w-full mt-1 py-3 text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-800 rounded text-center cursor-pointer font-semibold">
                Subir imágenes
                <input type="file" accept=".jpg,.png" multiple className="hidden w-full h-full" onChange={handleAddImages} />
            </label>
            <DndProvider backend={HTML5Backend}>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {images.map((image, index) => (
                        <ImageItem
                            key={index}
                            index={index}
                            image={image}
                            moveImage={moveImage}
                            deleteImage={deleteImage}
                        />
                    ))}
                </div>
            </DndProvider>
        </>
    );
};

interface ImageItemProps {
    image: Image;
    index: number;
    moveImage: (dragIndex: number, hoverIndex: number) => void;
    deleteImage: (imageId: string) => void;
}

const ImageItem: React.FC<ImageItemProps> = ({ image, index, moveImage, deleteImage }) => {
    const ref = React.useRef<HTMLDivElement>(null);

    const [, drop] = useDrop({
        accept: 'image',
        hover(item: { index: number }) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            moveImage(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'image',
        item: { index },
        collect: (monitor: { isDragging: () => boolean; }) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1, margin: '10px' }}>
            <img src={image.url} alt={`Restaurant Image ${index}`} style={{ width: '150px', height: '150px' }} />
            <Button
                color="red"
                onClick={() => deleteImage(image.url)}
                className="w-full mt-1 text-white  border-0  focus:outline-none hover:bg-red-600 rounded "
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                Borrar
            </Button>
        </div>
    );
};

export default RestaurantImages;