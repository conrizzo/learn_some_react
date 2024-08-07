


import React, { useState, useEffect } from 'react';
import Modal from '../components/Modals/ConfirmationModal';
import TermsCheckbox from '../components/Forms/checkbox';
import styles from './agree-to-terms.module.css';
import TermsContent from '../text/terms';


// Define a type for the modal object
type ModalType = {
    isOpen: boolean;
    index: number;
};
const theArray: string[] = [];
const synonyms = [
    "completely",
    "entirely",
    "fully",
    "perfectly",
    "thoroughly",
    "wholly",
    "utterly",
    "quite", // informal
    "certainly",
    "definitely",
    "of course", // agreement
    "positively",
    "surely",
    "undoubtedly",
    "unquestionably",
    "without fail",
    "totally",
    "downright",
    "flat-out", // informal
    "radically",
    "stone-cold", // informal
    "hands down", // informal
    "absolutely", // used for emphasis
    "categorically",
    "indisputably",
    "indubitably",
    "veritably", // archaic
    "plain",
    "realistically",
    "frankly",
    "truly",
    "generally",
    "admittedly",
    "mostly",
    "truthfully",
    "substantially",
    "largely",
    "for sure",
    "you bet",
    "no doubt",
    "definitely", // informal
    "totally", // informal
    "completely", // informal
    "for real", // informal
    "exactly",
    "indeed",
    "all together",
    "assuredly",
    "in its entirety",
    "in all respects",
];

let tempSynonyms = [...synonyms]; // shallow copy of the synonyms array

function removeAndReturnItem(): string | undefined {
    if (tempSynonyms.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * tempSynonyms.length);
    console.log(tempSynonyms.length);
    return tempSynonyms.splice(randomIndex, 1)[0];
}

const AgreeToTerms: React.FC = () => {   

    const [showTerms, setShowTerms] = useState(false);
    const [linkText, setLinkText] = useState('Read Terms');
    const handleOnClickShowTerms = () => {
        setShowTerms(!showTerms);
        setLinkText(prevText => prevText === 'Read Terms' ? 'Hide Terms' : 'Read Terms');
    };


    const getSynonym = () => removeAndReturnItem();

    // the -1 represents a default starting state, the 'false' in the next 2 lines also represent this
    const [modals, setModals] = useState<ModalType[]>([{ isOpen: false, index: -1 }]);
    const [checkboxStates, setCheckboxStates] = useState<boolean[]>([false]);

    const generateDynamicText = (index: number) => {
        if (index <= 0) {
            return [];
        }
        const synonym = getSynonym();
        const newValue = synonym ? synonym : 'incredible you agreed more than 50 times!';
        theArray.push(newValue);
        return theArray;
    };


    const handleCheckboxChange = (index: number) => {
        const updatedStates = [...checkboxStates];
        updatedStates[index] = !updatedStates[index];
        setCheckboxStates(updatedStates);
    };

    const addModal = (index?: number) => {
        if (index === undefined) {
            return;
        }
        if (checkboxStates[index] === false) {
            return;
        }

        const newIndex = modals.length;
        setModals([...modals, { isOpen: true, index: newIndex }]);
        setCheckboxStates([...checkboxStates, false]);
    };

    const closeModal = (index: number, closeOverride: boolean = false) => {
        if (checkboxStates[index] === false && closeOverride === false) {
            return;
        }

        if (closeOverride) {
            // Reset to initial state if "Disagree" is selected
            setModals([{ isOpen: false, index: -1 }]);
            setCheckboxStates([false]);
            theArray.length = 0;
        } else {
            // Close the modal normally
            const updatedModals = modals.map((modal) => {
                if (modal.index === index) {
                    return { ...modal, isOpen: false };
                }
                return modal;
            });
            setModals(updatedModals);
        }
    };

    const [dynamicText, setDynamicText] = useState<string>('');
    const index = modals.length - 1;
    useEffect(() => {
        // This code runs when the component mounts and whenever `index` changes
        setDynamicText(generateDynamicText(index).join(', ') || '');
    }, [index]); // Dependency array, `generateDynamicText` is called when `index` changes

    return (
        <div>
            <div className={styles['center-text']}>
                <h1>Agreeing to terms and conditions</h1>
                <p>Made to simulate the internet with 100% accuracy</p>
            </div>
            <div className={styles.centering}>
                <div className={`${styles.centering} ${styles['agree-background']}`}>
                    <div className={styles['vertical-container']}>
                        <div className={styles['check-box']}>
                            <TermsCheckbox
                                labelText={`Do you agree to the terms and conditions?`}
                                isChecked={checkboxStates[0]}
                                onChange={() => handleCheckboxChange(0)}
                            />
                        </div>
                        <button className={`clean-button ${styles['button-margin']}`} onClick={() => addModal(0)}>Confirm</button>
                        <a className={`${styles.link} ${styles['link-with-margin']}`} onClick={handleOnClickShowTerms}>{linkText}</a>
                    </div>
                </div>
            </div>
            {showTerms && (
                <div className={styles.centering}>
                    <div className={`${styles.centering} ${styles['agree-background']}`}>
                        <div className={styles['vertical-container']}>
                            <div className={styles['check-box']}>
                                <TermsContent />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {modals.map((modal, index) => (

                <Modal key={index} isOpen={modal.isOpen} onClose={() => closeModal(modal.index)}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className={`${styles['check-box']}`}>
                            <TermsCheckbox
                                labelText={`Are you ${dynamicText} sure you agree to the terms and conditions?`}
                                isChecked={checkboxStates[index]}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <br></br>
                        </div>
                        <div>
                            <button className={`clean-button ${styles['button-margin']}`} onClick={() => closeModal(index, true)}>
                                Disagree
                            </button>
                            <button className={`clean-button ${styles['button-margin']}`} onClick={() => { closeModal(index); addModal(index); }}>Confirm</button>
                        </div>
                        <span>You agreed <i>only</i> {index} times</span>
                    </div>
                </Modal>
            ))}
        </div>
    );
};

export default AgreeToTerms;