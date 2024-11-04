import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './StaffDetailModal.css';

const UserDetailModal = ({ show, onClose, user }) => {
    return (
        <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Staff Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className="user-detail-modal-body">
                {user ? (
                    <Form>
                        <div className="modal-columns">
                            <div className="left-column">
                                <Form.Group className="mb-3">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control type="text" value={user.id} readOnly />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" value={user.email} readOnly />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control type="text" value={user.role} readOnly />
                                </Form.Group>    
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text" value={user.password} readOnly />
                                </Form.Group>                        
                            </div>
                            <div className="right-column">
                                <Form.Group className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" value={user.username} readOnly />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Create Date</Form.Label>
                                    <Form.Control type="email" value={user.email} readOnly />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control type="text" value={user.status ? 'Active' : 'Banned'} readOnly />
                                </Form.Group>                               
                            </div>
                        </div>
                    </Form>
                ) : (
                    <p>No details available</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserDetailModal;
