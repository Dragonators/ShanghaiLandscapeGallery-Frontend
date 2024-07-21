import axios from 'axios'
// 创建一个Axios实例
const apiClient = axios.create({
  baseURL: 'https://localhost:7032/api/v1', // 请替换为你的API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {

  // 通过ID获取图片
  async getImageById(imageId) {
    try {
      const response = await apiClient.get(`/Image/${imageId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching image with ID ${imageId}:`, error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
    }
  },

  // 添加评论
  async addComment(imageId, comment) {
    try {
      const response = await apiClient.post(`/Image/${imageId}/Comment`, comment);
      return response.data;
    } catch (error) {
      console.error(`Error adding comment to image with ID ${imageId}:`, error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
    }
  },

  // 添加评分
  async addRating(imageId, rating) {
    try {
      const response = await apiClient.post(`/Image/${imageId}/Rating`, rating);
      return response.data;
    } catch (error) {
      console.error(`Error adding rating to image with ID ${imageId}:`, error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
    }
  },

  // 添加标签
  async addTag(imageId, tag) {
    try {
      const response = await apiClient.post(`/Image/${imageId}/Tag`, tag);
      return response.data;
    } catch (error) {
      console.error(`Error adding tag to image with ID ${imageId}:`, error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
    }
  },

  // 删除标签
  async deleteTag(imageId, tag) {
    try {
      const response = await apiClient.delete(`/Image/${imageId}/Tag`, {
        data: tag
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting tag from image with ID ${imageId}:`, error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
    }
  },

  // 获取图片总数
  async getImageCount() {
    try {
      const response = await apiClient.get(`/Image/count`);
      return response.data;
    } catch (error) {
      console.error(`Error getting count of images`, error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
    }
  },

  // 上传图片
  async uploadImage(formData){
    try{
      const response = await apiClient.post(`/Image`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.status;
    }
    catch (error) {
      console.error(`Error uploading images`, error.message);
      throw error.response ? error.response.data : error;
    }
  },

  // 删除图片
  async deleteImage(imageId) {
    try {
      const response = await apiClient.delete(`/Image/${imageId}`);
      return response.status;
    } catch (error) {
      console.error(`Error deleting image with ID ${imageId}:`, error.response ? error.response.data : error.message);
      throw error.response ? error.response.data : error;
    }
  },

  // 更新图片
  async updateImage(imageId, formData) {
    try {
      const response = await apiClient.put(`/Image/${imageId}`, formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }});
      return response.status;
    } catch (error) {
      console.error(`Error updating image with ID ${imageId}:`, error.message);
      throw error.response ? error.response.data : error;
    }
  }
}
