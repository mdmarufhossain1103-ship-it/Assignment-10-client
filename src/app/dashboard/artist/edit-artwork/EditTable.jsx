'use client'

import React, { useState } from 'react'
import { Table, Button, Modal } from '@heroui/react'
import { Pencil } from '@gravity-ui/icons'
import { updateArtwork } from '@/lib/api/artist'

const EditTable = ({ artworks: initialArtworks }) => {
    const [artworks, setArtworks] = useState(initialArtworks)

    const [isOpen, setIsOpen] = useState(false)
    const [selectedArtwork, setSelectedArtwork] = useState(null)

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')

    // OPEN EDIT
    const handleEdit = (artwork) => {
        setSelectedArtwork(artwork)
        setTitle(artwork.title)
        setPrice(artwork.price)
        setIsOpen(true)
    }

    // UPDATE
    const handleUpdate = async () => {
        try {
            const payload = {
                title,
                price: Number(price),
            }

            const res = await updateArtwork(
                selectedArtwork._id,
                payload
            )

            if (res.modifiedCount > 0) {
                setArtworks((prev) =>
                    prev.map((a) =>
                        a._id === selectedArtwork._id
                            ? { ...a, ...payload }
                            : a
                    )
                )

                setIsOpen(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">
                Manage Artworks
            </h1>

            {/* TABLE */}
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="artworks table">

                        {/* HEADER */}
                        <Table.Header>
                            <Table.Column isRowHeader>
                                Title
                            </Table.Column>

                            <Table.Column>
                                Price
                            </Table.Column>

                            <Table.Column>
                                Actions
                            </Table.Column>
                        </Table.Header>

                        {/* BODY */}
                        <Table.Body>
                            {artworks.map((artwork) => (
                                <Table.Row key={artwork._id}>
                                    <Table.Cell>
                                        {artwork.title}
                                    </Table.Cell>

                                    <Table.Cell>
                                        ${artwork.price}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            color="primary"
                                            variant="flat"
                                            onPress={() =>
                                                handleEdit(artwork)
                                            }
                                        >
                                            <Pencil />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>

                    </Table.Content>
                </Table.ScrollContainer>
            </Table>

            {/* MODAL */}
            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>

                <Modal.Backdrop>
                    <Modal.Container>
                        <Modal.Dialog>

                            <Modal.CloseTrigger />

                            <Modal.Header>
                                <Modal.Heading>
                                    Update Artwork
                                </Modal.Heading>
                            </Modal.Header>

                            <Modal.Body>
                                <input
                                    className="w-full border p-2 rounded mb-3"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                />

                                <input
                                    className="w-full border p-2 rounded"
                                    placeholder="Price"
                                    type="number"
                                    value={price}
                                    onChange={(e) =>
                                        setPrice(e.target.value)
                                    }
                                />
                            </Modal.Body>

                            <Modal.Footer>
                                <Button
                                    variant="light"
                                    onPress={() => setIsOpen(false)}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    color="primary"
                                    onPress={handleUpdate}
                                >
                                    Save Changes
                                </Button>
                            </Modal.Footer>

                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>

            </Modal>

        </div>
    )
}

export default EditTable