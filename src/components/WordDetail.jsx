import React, { useEffect, useState } from 'react';
import '../App.css';

const WordDetail = ({ word }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setData(data);
                    setError(null);
                } else {
                    setError("No data found for the word");
                    setData([]);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError("No data found for the word");
                setData([]);
            });
    }, [word]);

    if (error) {
        return <div className='container'><p>No such word exist. Check the spelling and search again.</p></div>;
    }

    if (data.length === 0) {
        return null; // Return nothing if the data array is empty
    }

    return (
        <div className='container'>
            {data.map((item, index) => (
                <div key={index}>
                    <div className='card'>
                        <h2>{item.word}</h2>
                        {item.phonetics && item.phonetics.length > 0 && item.phonetics[0].audio && (
                            <p>
                                <strong>🔈:</strong> <a href={item.phonetics[0].audio} target="_blank" rel="noopener noreferrer">Click to listen to the pronunciation</a>
                            </p>
                        )}
                        {item.meanings.map((meaning, meaningIndex) => (
                            <div key={meaningIndex} className='definition-card'>
                                <h3>Definition {meaningIndex + 1}</h3>
                                <p><strong>Part of Speech:</strong> {meaning.partOfSpeech}</p>
                                <p><strong>Definition:</strong> {meaning.definitions[0].definition}</p>
                                {meaning.definitions[0].example && <p><strong>Example:</strong> {meaning.definitions[0].example}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WordDetail;
