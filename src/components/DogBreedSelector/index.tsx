import React, { useState, useEffect, ChangeEvent } from "react";
import Select from "../Select";
import styles from './dogBreedSelector.module.scss';
import Spinner from "../Spinner";

interface Breeds {
    [breed: string]: string[];
}

const DogBreedSelector: React.FC = () => {
    const [breeds, setBreeds] = useState<Breeds>({});
    const [selectedBreed, setSelectedBreed] = useState<string>("");
    const [subBreeds, setSubBreeds] = useState<string[]>([]);
    const [selectedSubBreed, setSelectedSubBreed] = useState<string>("");
    const [imageCount, setImageCount] = useState<number>(1);
    const [images, setImages] = useState<string[]>([]);
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        fetch("https://dog.ceo/api/breeds/list/all")
            .then((response) => response.json())
            .then((data) => {
                setBreeds(data.message);
            });
    }, []);

    const handleBreedSelection = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedBreed(e.target.value);
        setSubBreeds(breeds[e.target.value] || []);
        setSelectedSubBreed("");
    };

    const handleSubBreedSelection = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubBreed(e.target.value);
    };

    const handleImageCountSelection = (e: ChangeEvent<HTMLInputElement>) => {
        setImageCount(parseInt(e.target.value));
    };

    const fetchImages = async () => {
        if (selectedBreed === "") {
            setError("Please select a breed.");
            setIsLoading(false);
            return;
        }

        setError("");
        setIsLoading(true);

        const url = selectedSubBreed
            ? `https://dog.ceo/api/breed/${selectedBreed}/${selectedSubBreed}/images/random/${imageCount}`
            : `https://dog.ceo/api/breed/${selectedBreed}/images/random/${imageCount}`;

        try {
            await fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    setImages(data.message);
                });
        }
        catch (e) {
            console.log("Error", e);
        }
        finally {
            setIsLoading(false);
        }
    };

    const breedOptions = Object.keys(breeds).map((breed) => ({
        value: breed,
        label: breed,
    }));

    const subBreedOptions = subBreeds.map((subBreed) => ({
        value: subBreed,
        label: subBreed,
    }));

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.card}>
                <div className={styles.menuWrapper}>
                    <div className={styles.formGroup}>
                        <h2>Breed:</h2>
                        <Select
                            options={[{ value: "", label: "Choose a breed" }, ...breedOptions]}
                            value={selectedBreed}
                            onChange={handleBreedSelection}
                        />
                    </div>
                    {subBreeds.length > 0 && (
                        <div className={styles.formGroup}>
                            <h2>Sub-breed:</h2>
                            <Select
                                options={[
                                    { value: "", label: "Choose a sub-breed" },
                                    ...subBreedOptions,
                                ]}
                                value={selectedSubBreed}
                                onChange={handleSubBreedSelection}
                            />
                        </div>
                    )}
                    <div className={styles.formGroup}>
                        <h2>Number of images:</h2>
                        <input
                            type="number"
                            value={imageCount}
                            onChange={handleImageCountSelection}
                            min="1"
                        />
                    </div>
                    <button onClick={fetchImages}>View Images</button>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                {isLoading ? <Spinner /> :
                    <div className={styles.imagesContainer}>
                        {images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`${selectedBreed} ${selectedSubBreed}`}
                            />
                        ))}
                    </div>
                }
            </div>
        </div>
    );
};

export default DogBreedSelector;
