 import { useSelector, useDispatch } from 'react-redux'
import {
	add,
	del,
	edit,
	toggleStatus,
} from './store/reducers/table-user/tableSlice'
import { useState } from 'react'
import {
	Button,
	Modal,
	Box,
	TextField,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import InfoIcon from '@mui/icons-material/Info'
import './App.css'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	borderRadius: '10px',
	boxShadow: 24,
	p: 4,
}

export default function App() {
	const { data } = useSelector(state => state.todolist)
	const dispatch = useDispatch()

	const [search, setSearch] = useState('')
	const [filterStatus, setFilterStatus] = useState('')
	const [filterCity, setFilterCity] = useState('')

	const [modalOpen, setModalOpen] = useState(false)
	const [editModalOpen, setEditModalOpen] = useState(false)
	const [infoModalOpen, setInfoModalOpen] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
		desc: '',
		email: '',
		phone: '',
		city: '',
		status: 'Active',
	})

	const [editData, setEditData] = useState({
		id: null,
		name: '',
		desc: '',
		email: '',
		phone: '',
		city: '',
		status: 'Active',
	})

	const [selectedUser, setSelectedUser] = useState(null)

	const handleAddUser = () => {
		const { name, desc, email, phone, city } = formData
		if (name && desc && email && phone && city) {
			dispatch(add(formData))
			setFormData({
				name: '',
				desc: '',
				email: '',
				phone: '',
				city: '',
				status: 'Active',
			})
			setModalOpen(false)
		}
	}

	const handleEditUser = () => {
		dispatch(
			edit({
				id: editData.id,
				newName: editData.name,
				newDesc: editData.desc,
				newEmail: editData.email,
				newPhone: editData.phone,
				newCity: editData.city,
				newStatus: editData.status,
			})
		)
		setEditModalOpen(false)
	}

	const filteredData = data.filter(
		user =>
			(user.name.toLowerCase().includes(search.toLowerCase()) ||
				user.email.toLowerCase().includes(search.toLowerCase())) &&
			(filterStatus ? user.status === filterStatus : true) &&
			(filterCity ? user.city === filterCity : true)
	)

	const allTajikistanCities = [
		'Dushanbe',
		'Khujand',
		'Bokhtar',
		'Kulob',
		'Isfara',
		'Istaravshan',
		'Tursunzoda',
		'Vahdat',
		'Hissar',
		'Panjakent',
		'Khorugh',
		'Konibodom',
		'Rogun',
		'Nurek',
		'Asht',
		'Shahriston',
		'Rasht',
		'Farkhor',
		'Danghara',
		'Yovon',
		'Baljuvon',
		'Jilikul',
		'Qumsangir',
		'Zafarobod',
	]
	const uniqueCities = allTajikistanCities

	return (
		<div className='container'>
			<h2>User Management Table</h2>

			<div className='filters'>
				<TextField
					label='Search by name/email'
					value={search}
					onChange={e => setSearch(e.target.value)}
					size='small'
				/>
				<FormControl size='small'>
					<InputLabel>Status</InputLabel>
					<Select
						value={filterStatus}
						onChange={e => setFilterStatus(e.target.value)}
						label='Status'
					>
						<MenuItem value=''>All</MenuItem>
						<MenuItem value='Active'>Active</MenuItem>
						<MenuItem value='Inactive'>Inactive</MenuItem>
					</Select>
				</FormControl>
				<FormControl size='small'>
					<InputLabel>City</InputLabel>
					<Select
						value={filterCity}
						onChange={e => setFilterCity(e.target.value)}
						label='City'
					>
						<MenuItem value=''>All</MenuItem>
						{uniqueCities.map(city => (
							<MenuItem key={city} value={city}>
								{city}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button variant='contained' onClick={() => setModalOpen(true)}>
					Add User
				</Button>
			</div>

			<table className='user-table'>
				<thead>
					<tr>
						<th>Name</th>
						<th>Description</th>
						<th>Email</th>
						<th>Phone</th>
						<th>City</th>
						<th>Status</th>
						<th>Done</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{filteredData.length > 0 ? (
						filteredData.map(user => (
							<tr key={user.id}>
								<td className={user.done ? 'done' : ''}>{user.name}</td>
								<td className={user.done ? 'done' : ''}>{user.desc}</td>
								<td>{user.email}</td>
								<td>{user.phone}</td>
								<td>{user.city}</td>
								<td>{user.status}</td>
								<td>
									<input
										type='checkbox'
										checked={user.done}
										onChange={() => dispatch(toggleStatus(user.id))}
									/>
								</td>
								<td>
									<Button
										size='small'
										onClick={() => dispatch(del(user.id))}
										color='error'
									>
										<DeleteIcon />
									</Button>
									<Button
										size='small'
										onClick={() => {
											setEditData({
												id: user.id,
												name: user.name,
												desc: user.desc,
												email: user.email,
												phone: user.phone,
												city: user.city,
												status: user.status,
											})
											setEditModalOpen(true)
										}}
									>
										<EditIcon />
									</Button>
									<Button
										size='small'
										onClick={() => {
											setSelectedUser(user)
											setInfoModalOpen(true)
										}}
									>
										<InfoIcon />
									</Button>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan='8' style={{ textAlign: 'center', color: 'gray' }}>
								No users found 🙁
							</td>
						</tr>
					)}
				</tbody>
			</table>

			{/* Add  */}
			<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
				<Box sx={style}>
					<h3>Add User</h3>
					{['name', 'desc', 'email', 'phone', 'city'].map(field => (
						<TextField
							key={field}
							fullWidth
							margin='dense'
							label={field.charAt(0).toUpperCase() + field.slice(1)}
							value={formData[field]}
							onChange={e =>
								setFormData({ ...formData, [field]: e.target.value })
							}
						/>
					))}
					<FormControl fullWidth margin='dense'>
						<InputLabel>Status</InputLabel>
						<Select
							value={formData.status}
							label='Status'
							onChange={e =>
								setFormData({ ...formData, status: e.target.value })
							}
						>
							<MenuItem value='Active'>Active</MenuItem>
							<MenuItem value='Inactive'>Inactive</MenuItem>
						</Select>
					</FormControl>
					<Button
						fullWidth
						variant='contained'
						onClick={handleAddUser}
						sx={{ mt: 2 }}
					>
						Save
					</Button>
				</Box>
			</Modal>

			{/* Edit  */}
			<Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
				<Box sx={style}>
					<h3>Edit User</h3>
					{['name', 'desc', 'email', 'phone', 'city'].map(field => (
						<TextField
							key={field}
							fullWidth
							margin='dense'
							label={field.charAt(0).toUpperCase() + field.slice(1)}
							value={editData[field]}
							onChange={e =>
								setEditData({ ...editData, [field]: e.target.value })
							}
						/>
					))}
					<FormControl fullWidth margin='dense'>
						<InputLabel>Status</InputLabel>
						<Select
							value={editData.status}
							label='Status'
							onChange={e =>
								setEditData({ ...editData, status: e.target.value })
							}
						>
							<MenuItem value='Active'>Active</MenuItem>
							<MenuItem value='Inactive'>Inactive</MenuItem>
						</Select>
					</FormControl>
					<Button
						fullWidth
						variant='contained'
						onClick={handleEditUser}
						sx={{ mt: 2 }}
					>
						Save Changes
					</Button>
				</Box>
			</Modal>

			{/* Info */}
			<Modal open={infoModalOpen} onClose={() => setInfoModalOpen(false)}>
				<Box sx={style}>
					<h3>User Info</h3>
					{selectedUser && (
						<>
							<p>
								<strong>Name:</strong> {selectedUser.name}
							</p>
							<p>
								<strong>Description:</strong> {selectedUser.desc}
							</p>
							<p>
								<strong>Email:</strong> {selectedUser.email}
							</p>
							<p>
								<strong>Phone:</strong> {selectedUser.phone}
							</p>
							<p>
								<strong>City:</strong> {selectedUser.city}
							</p>
							<p>
								<strong>Status:</strong> {selectedUser.status}
							</p>
							<p>
								<strong>Done:</strong> {selectedUser.done ? 'Yes' : 'No'}
							</p>
						</>
					)}
					<Button
						fullWidth
						variant='outlined'
						onClick={() => setInfoModalOpen(false)}
						sx={{ mt: 2 }}
					>
						Close
					</Button>
				</Box>
			</Modal>
		</div>
	)
}
