import React, { useState } from 'react';
import Modal from '../components/Modals/ConfirmationModal';
import styles from './are-you-bored.module.css';
import theImage from '/images/bored/lord_of_rings.jpg';
// <img src={'/images/bored/lord_of_rings.jpg'} alt="Lord of the Rings" />

type ModalType = {
    isOpen: boolean;
    index: number;
    text?: string;
    image?: string; // Add the 'image' property to the type definition
};

const AgreeToTerms: React.FC = () => {

    const decisionTree = {
        question: "Are you bored?",
        choices: [
            {
                answer: "Yes",
                next:
                    "Lord of the Rings"
                ,
                image: "",
            },
            {
                answer: "No",
                next: {
                    question: "Are you doing something important?",
                    choices: [
                        { answer: "Yes", next: "No you aren't ..." },
                        { answer: "No", next: "Lord of the Rings" }
                    ]
                }
            }
        ]
    };

    const [currentNode, setCurrentNode] = useState(decisionTree);
    const [modals, setModals] = useState<ModalType[]>([]);
    const [showDelayedPart, setShowDelayedPart] = useState(false);

    const handleChoice = (choice: any) => {
        if (typeof choice.next === 'string') {
            // Assuming reaching a string means the end of the decision tree
            if (choice.next.includes("No you") || choice.next.includes("Lord of the Rings")) {
                setTimeout(() => {
                    setShowDelayedPart(true);
                }, 1000); // Delay the second part for 1 second
            }
            setCurrentNode({ question: choice.next, choices: [] });
        } else {
            setCurrentNode(choice.next);
        }
    };

    const addModal = (text?: string) => {
        const newIndex = modals.length;
        setModals([...modals, { isOpen: true, index: newIndex, text }]); // Include the text in the new modal object
        console.log(modals);
    };

    const closeModal = (index: number, closeOverride: boolean = false) => {
        if (closeOverride) {
            setModals([{ isOpen: false, index: -1 }]);
        } else {
            const updatedModals = modals.map((modal) => {
                if (modal.index === index) {
                    return { ...modal, isOpen: false };
                }
                return modal;
            });
            setModals(updatedModals);
        }
        setCurrentNode(decisionTree); // Reset the decision tree
        setShowDelayedPart(false); // reset the delayed text on a final choice
    };

    return (
        <div>
            <div className={styles.centering} style={{ height: '80vh' }}>
                <div className={`${styles.centering} ${styles['agree-background']}`}>
                    <div className={styles['vertical-container']}>
                        <p style={{ textAlign: 'center' }}>Please press <b>Start</b> to begin your Adventure</p>
                        <button className={`clean-button ${styles['button-margin']}`} onClick={() => { addModal(); }}>Start</button>
                    </div>
                </div>
            </div>
            {modals.map((modal, index) => (
                <Modal key={index} isOpen={modal.isOpen} onClose={() => closeModal(modal.index)}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className={styles['check-box']}>
                            <div>
                                <p className={styles.centering}>{currentNode.question || 'Question'}</p>
                                <div className={styles.centering}>
                                    {currentNode.choices ? (
                                        currentNode.choices.map((choice, index) => (
                                            <button className={`clean-button ${styles['button-margin']}`} key={index} onClick={() => handleChoice(choice)}>

                                                {choice.answer}

                                            </button>
                                        ))
                                    ) : (
                                        <p>{JSON.stringify(currentNode)}</p>
                                    )}
                                </div>
                            </div>

                            <p>{modal.text || ''}</p>
                            {/* showDelayedPart && <p>Lord of the Rings</p> */}
                            {showDelayedPart && <img src={'/images/bored/lord_of_rings.jpg'} alt="Lord of the Rings" />}

                        </div>
                        <div>

                        </div>
                    </div>
                </Modal>
            ))}
        </div>
    );
};

export default AgreeToTerms;