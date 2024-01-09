import { PRODUCTS_URL, UPLOADS_URL,UPLOADS_BANNERIMG,UPLOADS_BANNERIMGTWO,UPLOADS_BANNERIMGTHREE } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ pageNumber, keyword,brand }) => ({
        url: PRODUCTS_URL,
        params: {
          keyword,
          pageNumber,
          brand,
        },
      }),
      invalidatesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    uploadBannerImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_BANNERIMG}`,
        method: "POST",
        body: data,
      }),
    }),
    uploadBannerImageTwo: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_BANNERIMGTWO}`,
        method: "POST",
        body: data,
      }),
    }),
    uploadBannerImageThree: builder.mutation({
      query: (data) => ({
        url: `${UPLOADS_BANNERIMGTHREE}`,
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getTopProduct: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      invalidatesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useUploadBannerImageMutation,
  useUploadBannerImageTwoMutation,
  useUploadBannerImageThreeMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductQuery,
} = productsApiSlice;
