import React, { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './Slider.module.scss';
import Card from '../card/Card';
import Spinner from '../../UI/spinner/Spinner';
import Button from '../../UI/button/Button';
import { API_KEY, PICS_API } from '../../constants/constants';
import { Breed } from '../../interfaces/interfaces';

interface SliderProps {
  cards: Breed[];
  isLoading: boolean;
}

export const Slider: React.FC<SliderProps> = ({ cards, isLoading }) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [pictureUrl, setPictureUrl] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const currentCard = cards[currentSlide];

    const goToPrevSlide = () => {
        const index = currentSlide === 0 ? cards.length - 1 : currentSlide - 1;
        setCurrentSlide(index);
        getRandomImage(cards[index].id);
    };

    const goToNextSlide = () => {
        const index = currentSlide === cards.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(index);
        getRandomImage(cards[index].id);
    };

    async function getRandomImage(breed: string) {
        try {
            setLoading(true);
            const { data } = await axios.get<any[]>(
                `${PICS_API}${API_KEY}&limit=1&breed_id=${breed}`
            );
            setPictureUrl(data[0].url);
            return data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
  
    useEffect(() => {
        if (cards[0]) {
            getRandomImage(cards[0].id);
        }
    }, [cards]);

    return (
        <section className={classes.slider}>
            <h1>The Cat Super App</h1>

            {isLoading && (
                <div className={classes.slider__spinner}>
                    <Spinner />
                </div>
            )}

            {!isLoading && cards.length > 0 && (
                <Card
                    name={currentCard.name}
                    description={currentCard.description}
                    image={pictureUrl}
                />
            )}
            <div className={classes.slider__buttons}>
                <Button
                    type="button"
                    label="Update Pic"
                    onClick={() => getRandomImage(currentCard.id)}
                />
            </div>

            <div className={classes.slider__buttons}>
                <Button label="Prev" onClick={goToPrevSlide} disabled={loading} />
                <Button label="Next" onClick={goToNextSlide} disabled={loading} />
            </div>
        </section>
    );
};

export default Slider;