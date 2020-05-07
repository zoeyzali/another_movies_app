import { useState } from 'react'

export const useModal = () => {
    const [isOpen, setIsOpen] = useState( false )

    function toggleModal() {
        setIsOpen( !isOpen )
    }
    return {
        isOpen,
        toggleModal
    }
}
