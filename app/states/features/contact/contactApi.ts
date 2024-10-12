import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../api/tagTypesList";

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: () => {
        return {
          url: `/contacts`,
        };
      },
      providesTags: [tagTypes.contact],
    }),

    createContact: builder.mutation({
      query: (info) => {
        return {
          url: `/contact`,
          method: "POST",
          body: info,
        };
      },
      invalidatesTags: [tagTypes.contact],
    }),
    getFavoriteContact: builder.query({
      query: (id) => {
        return {
          url: `/contacts/favorites`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.contact],
    }),
    createFavorite: builder.mutation({
      query: (id) => {
        return {
          url: `/contact/${id}/favorite`,
          method: "PATCH",
        };
      },
      invalidatesTags: [tagTypes.contact],
    }),

    updateContact: builder.mutation({
      query: (data) => {
        return {
          url: `/contact/${data.id}`,
          method: "PUT",
          body: data.contact,
        };
      },
      invalidatesTags: [tagTypes.contact],
    }),

    deleteContact: builder.mutation({
      query: (id) => {
        return {
          url: `/contact/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.contact],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useCreateFavoriteMutation,
  useGetFavoriteContactQuery,
  useGetAllContactsQuery,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactApi;
