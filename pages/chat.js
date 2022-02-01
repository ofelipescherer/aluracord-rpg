import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
	const [message, setMessage] = React.useState('');
	const [messageList, setMessageList] = React.useState([]);

	function handleNewMessage(newMessage) {
		const message = {
			id: messageList.length + 1,
			de: 'ofelipescherer',
			texto: newMessage,
		};

		setMessageList([message, ...messageList]);
		setMessage('');
	}

	function handleDeleteMessage(event) {
		const listFiltered = messageList.filter((messageFiltered) => {
			return messageFiltered.id != Number(event.target.dataset.id);
		});

		setMessageList(listFiltered);
	}

	return (
		<Box
			styleSheet={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: appConfig.theme.colors.primary[200],
				backgroundImage:
					'url(https://cdn.wallpapersafari.com/63/76/yML3la.jpg)',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundBlendMode: 'multiply',
			}}
		>
			<Box
				styleSheet={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
					boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
					borderRadius: '5px',
					backgroundColor: appConfig.theme.colors.neutrals[700],
					height: '100%',
					maxHeight: '90vh',
					padding: '32px',
					maxWidth: '70%',
				}}
			>
				<Header />
				<Box
					styleSheet={{
						position: 'relative',
						display: 'flex',
						flex: 1,
						height: '80%',
						backgroundColor: appConfig.theme.colors.neutrals[600],
						flexDirection: 'column',
						borderRadius: '5px',
						padding: '16px',
					}}
				>
					<MessageList
						mensagens={messageList}
						handleDeleteMessage={handleDeleteMessage}
					/>

					<Box
						as="form"
						styleSheet={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<TextField
							value={message}
							onChange={(event) => setMessage(event.target.value)}
							onKeyPress={(event) => {
								if (event.key === 'Enter') {
									event.preventDefault();
									handleNewMessage(message);
								}
							}}
							placeholder="Insira sua message aqui..."
							type="textarea"
							styleSheet={{
								width: '100%',
								border: '0',
								resize: 'none',
								borderRadius: '5px',
								padding: '6px 8px',
								backgroundColor: appConfig.theme.colors.neutrals[800],
								marginRight: '12px',
								color: appConfig.theme.colors.neutrals[200],
							}}
						/>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

function Header() {
	return (
		<>
			<Box
				styleSheet={{
					width: '100%',
					marginBottom: '16px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					color: appConfig.theme.colors.neutrals[200],
				}}
			>
				<Text variant="heading5">RPG Chat</Text>
				<Button
					variant="tertiary"
					colorVariant="neutral"
					label="Logout"
					href="/"
				/>
			</Box>
		</>
	);
}

export function MessageList(props) {
	return (
		<Box
			tag="ul"
			styleSheet={{
				overflow: 'auto',
				display: 'flex',
				flexDirection: 'column-reverse',
				flex: 1,
				color: appConfig.theme.colors.neutrals['000'],
				marginBottom: '16px',
			}}
		>
			{props.mensagens.map((message) => {
				return (
					<Text
						key={message.id}
						tag="li"
						styleSheet={{
							borderRadius: '5px',
							padding: '6px',
							marginBottom: '12px',
							hover: {
								backgroundColor: appConfig.theme.colors.neutrals[700],
							},
						}}
					>
						<Text
							onClick={props.handleDeleteMessage}
							styleSheet={{
								fontSize: '10px',
								fontWeight: 'bold',
								marginLeft: 'auto',
								color: '#FFF',
								backgroundColor: 'rgba(0,0,0,.5)',
								width: '20px',
								height: '20px',
								borderRadius: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								cursor: 'pointer',
							}}
							tag="span"
							data-id={message.id}
						>
							X
						</Text>
						<Box
							styleSheet={{
								marginBottom: '8px',
							}}
						>
							<Image
								styleSheet={{
									width: '20px',
									height: '20px',
									borderRadius: '50%',
									display: 'inline-block',
									marginRight: '8px',
								}}
								src={`https://github.com/ofelipescherer.png`}
							/>
							<Text tag="strong">{message.de}</Text>
							<Text
								styleSheet={{
									fontSize: '10px',
									marginLeft: '8px',
									color: appConfig.theme.colors.neutrals[300],
								}}
								tag="span"
							>
								{new Date().toLocaleDateString()}
							</Text>
						</Box>
						{message.texto}
					</Text>
				);
			})}
		</Box>
	);
}
