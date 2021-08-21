import React, { useRef } from 'react';
import { Button, TextField } from '@material-ui/core'

export const Email = props => {
	const inputForm = useRef(null);
    const handleClick = () => {};
    return (
        <div>
            <h2>Update Email</h2>

			<form ref={inputForm}>
				<TextField
					label="new email"
					name="new email"
				/> <br />
			</form>
			<Button
				variant="contained"
				color="primary"
				size="large"
				style={{ margin: "0 auto", display: "flex" }}
				onClick={handleClick}
			>
				Submit
			</Button>
        </div>

    )
}