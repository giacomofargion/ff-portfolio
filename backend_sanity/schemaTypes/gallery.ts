export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    {
      name: 'images',
      title: 'Images',
      type: 'array', // Changed to an array
      of: [{ type: 'image' }], // Specify that the array contains images
      options: {
        hotspot: true, // Allow hotspot for image cropping
      },
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string', // Add a title or any other field to check
    },
  ],
};
