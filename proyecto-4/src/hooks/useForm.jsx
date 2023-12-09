import React, { useState } from 'react'

export const useForm = (initialObj = {}) => {

    const [form, setForm] = useState(initialObj);

    const changed = ({target}) => {
        // console.log(target);

        const { name, value } = target;

        setForm({
            ...form,
            [name]: value
        });
    }

  return {
    form,
    changed
  };

}
