import React, { useState, useEffect } from 'react';
import Modal from '../components/Modals/ConfirmationModal';
import TermsCheckbox from '../components/Forms/checkbox';
import styles from './agree-to-terms.module.css';

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
    "cold", // slang
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
    "in its entirety"
];


// Define a type for the modal object
type ModalType = {
    isOpen: boolean;
    index: number;
};

function pickAndRemoveRandomElement(arr: string[]): string | undefined {

    if (arr.length === 0) {
        return undefined;
    }

    const randomIndex = Math.floor(Math.random() * arr.length);
    const [pickedElement] = arr.splice(randomIndex, 1);
    return pickedElement;
}


const AgreeToTerms: React.FC = () => {
    const getSynonym = pickAndRemoveRandomElement(synonyms)

    const [modals, setModals] = useState<ModalType[]>([{ isOpen: false, index: -1 }]);
    const [checkboxStates, setCheckboxStates] = useState<boolean[]>([false]);

    const generateDynamicText = (index: number) => Array(index).fill(
        getSynonym
    ).join(', ');

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

        const updatedModals = modals.map((modal) => {
            if (modal.index === index) {
                return { ...modal, isOpen: false };
            }
            return modal;
        });
        setModals(updatedModals);
    };

    const [dynamicText, setDynamicText] = useState('');
    const index = modals.length - 1; // Define the 'index' variable
    useEffect(() => {
        // This code runs when the component mounts and whenever `index` changes
        setDynamicText(generateDynamicText(index));
    }, [index]); // Dependency array, `generateDynamicText` is called when `index` changes


    return (
        <div>


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
                        <button className="clean-button" onClick={() => addModal(0)}>Confirm</button>
                    </div>
                </div>
            </div>
            {modals.map((modal, index) => (
                <Modal key={index} isOpen={modal.isOpen} onClose={() => closeModal(modal.index)}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className={styles['check-box']}>
                            <TermsCheckbox
                                labelText={`Are you ${dynamicText} sure you agree to the terms and conditions?`}

                                isChecked={checkboxStates[index]}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <br></br>
                            <br></br>
                            {'You agreed only ' + index + ' times'}
                        </div>
                        <div>
                            <button className={`clean-button ${styles['button-margin']}`} onClick={() => closeModal(index, true)}>
                                Disagree
                            </button>
                            <button className="clean-button" onClick={() => { closeModal(index); addModal(index); }}>Confirm</button>
                        </div>
                    </div>
                </Modal>
            ))}
        </div>
    );
};

export default AgreeToTerms;