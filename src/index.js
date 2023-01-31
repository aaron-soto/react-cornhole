import React from 'react';
import ReactDOM from 'react-dom/client';

import './style.scss';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CreateBoard, Board, Welcome } from './components';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Welcome />,
	},
	{
		path: '/create-board',
		element: <CreateBoard />,
	},
	{
		path: '/board/:boardId',
		element: <Board />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<RouterProvider router={router} />
);
