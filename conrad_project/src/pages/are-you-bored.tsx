import React, { useState } from 'react';
import Modal from '../components/Modals/ConfirmationModal';
import styles from './are-you-bored.module.css';

type ModalType = {
    isOpen: boolean;
    index: number;
    text?: string;
};

const AgreeToTerms: React.FC = () => {

    const decisionTree = {
        question: "Are you bored?",
        choices: [
            {
                answer: "yes",
                next:
                    "Lord of the Rings"
                ,
            },
            {
                answer: "no",
                next: {
                    question: "Are you doing something important?",
                    choices: [
                        { answer: "yes", next: "No you are'nt!" },
                        { answer: "no", next: "Lord of the Rings" }
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
            if (choice.next.includes("No you")) {
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
            <div className={styles.centering}>
                <div className={`${styles.centering} ${styles['agree-background']}`}>
                    <div className={styles['vertical-container']}>

                        <button className="clean-button" onClick={() => { addModal(); }}>Start</button>

                    </div>
                </div>
            </div>
            {modals.map((modal, index) => (
                <Modal key={index} isOpen={modal.isOpen} onClose={() => closeModal(modal.index)}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className={styles['check-box']}>
                            <div>
                                <p >{currentNode.question || 'Question'}</p>
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
                            {showDelayedPart && <p>Lord of the Rings</p>}
                            <p>{modal.text || ''}</p>
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