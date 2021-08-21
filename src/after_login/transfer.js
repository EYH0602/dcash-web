
import React, { useRef } from 'react';
import { Button, TextField } from '@material-ui/core'

export const Transfer = props => {
	const inputForm = useRef(null);
    const handleClick = () => {};
    return (
        <div>
            <h2>Transfer</h2>

			<form ref={inputForm}>
				<TextField
					label="to"
					name="to"
				/> <br />
				<TextField
					label="amount"
					name="amount"
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