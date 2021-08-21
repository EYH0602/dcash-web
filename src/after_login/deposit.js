import React, { useRef } from 'react';
import { Button, TextField } from '@material-ui/core'

export const Deposit = props => {
	const inputForm = useRef(null);
    const handleClick = () => {};
    return (
        <div>
            <h2>Deposit</h2>

			<form ref={inputForm}>
				<TextField
					label="card_num"
					name="card_num"
				/> <br />
				<TextField
					label="card_pswd"
					name="card_pswd"
				/> <br />
				<TextField
					label="CVS"
					name="CVS"
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