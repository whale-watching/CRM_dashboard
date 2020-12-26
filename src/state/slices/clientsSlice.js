import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiClient } from '../../api/apiClient'
import { CLIENT_STATUSES } from '../clientStatuses'

export const fetchClients = createAsyncThunk('clients/fetchClients', async () => {
  const response = await apiClient.getClients()
  return response.data
})

export const addNewClient = createAsyncThunk('clients/addNewClient', async client => {
  const response = await apiClient.addNewClient(client)
  return response.data
})

export const updateClientByModal = createAsyncThunk('clients/updateClientByModal', async valuesToUpdate => {
  const response = await apiClient.updateClientByModal(valuesToUpdate)
  return response.data
})

const initialState = {
  data: [],
  status: CLIENT_STATUSES.idle,
  error: null,
}

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchClients.pending]: (state, action) => {
      state.status = CLIENT_STATUSES.pending
    },
    [fetchClients.fulfilled]: (state, action) => {
      state.status = CLIENT_STATUSES.succeeded
      state.data = state.data.concat(action.payload)
    },
    [fetchClients.rejected]: (state, action) => {
      state.status = CLIENT_STATUSES.failed
      state.error = action.error.message
    },
    [addNewClient.fulfilled]: (state, action) => {
      state.data.push(action.payload)
    },
    [updateClientByModal.fulfilled]: (state, action) => {
      const { _id: clientId, firstName, surname, country } = action.payload

      const client = state.data.find(client => client._id === clientId)
      client.firstName = firstName
      client.surname = surname
      client.country = country
      // Should update only specific keys
    }
  }
})

export const { clientAdded, clientUpdatedInModal } = clientsSlice.actions


export default clientsSlice.reducer;

export const selectAllClients = state => state.clients.data

export const selectClientById = (state, clientId) => state.clients.data.find(client => client._id === clientId)

export const selectClientStatus = state => state.clients.status
