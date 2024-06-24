import React, { useState } from 'react';
import Modal from '../components/Modals/ConfirmationModal';
import TermsCheckbox from '../components/Forms/checkbox';
import styles from './agree-to-terms.module.css';

// Define a type for the modal object
type ModalType = {
    isOpen: boolean;
    index: number;
};

const AgreeToTerms: React.FC = () => {
    const [modals, setModals] = useState<ModalType[]>([{ isOpen: false, index: -1 }]);
    const [checkboxStates, setCheckboxStates] = useState<boolean[]>([false]);

    const generateDynamicText = (index: number) => Array(index).fill('absolutely').join(', ');

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

    return (
        <div>
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
            {modals.map((modal, index) => (
                <Modal key={index} isOpen={modal.isOpen} onClose={() => closeModal(modal.index)}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className={styles['check-box']}>
                            <TermsCheckbox
                                labelText={`Are you ${generateDynamicText(index)} sure you agree to the terms and conditions?`}
                                
                                isChecked={checkboxStates[index]}
                                onChange={() => handleCheckboxChange(index)}
                            /> 
                            <br></br>
                            <br></br>
                            {'You agreed ' + index + ' times'}
                        </div>
                        <div>
                            <button className={`clean-button ${styles['button-margin']}`} onClick={() => closeModal(index, true)}>
                                Close
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