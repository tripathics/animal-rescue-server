import Rescues from "../models/rescues.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.util.js";

export const getOrgs = async (req, res, next) => {
  try {
    const orgsRecord = await User.findOrganizations();
    res.status(200).json({ organizations: orgsRecord });
  } catch (error) {
    next(error);
  }
}

export const getNearbyOrgs = async (req, res, next) => {
  const location = req.query;
  if (!location.lat || !location.lng) {
    return res.status(400).json({ message: 'Please provide both latitude and longitude' });
  }
  location.lat = parseFloat(location.lat);
  location.lng = parseFloat(location.lng);
  try {
    const orgsRecord = await User.findOrganizations();

    const radians = (degrees) => {
      degrees = parseFloat(degrees);
      return degrees * (Math.PI / 180);
    };

    const getDistance = (lat1, lng1, lat2, lng2) => {
      const radians = (degrees) => {
        degrees = parseFloat(degrees);
        return degrees * (Math.PI / 180);
      };

      const distance = 6371 * Math.acos(
        Math.min(1,
          Math.cos(radians(lat1)) *
          Math.cos(radians(lat2)) *
          Math.cos(radians(lng2) - radians(lng1)) +
          Math.sin(radians(lat1)) *
          Math.sin(radians(lat2))
        )
      );
      return distance;
    }

    const nearbyOrgsRecord = orgsRecord.map(org => ({
      ...org,
      distance: getDistance(location.lat, location.lng, org.location_lat, org.location_lng)
    })).sort((a, b) => (a.distance - b.distance
    )).slice(0, 10);

    res.status(200).json({ organizations: nearbyOrgsRecord });
  } catch (error) {
    next(error);
  }
}

export const submitRescueRequest = async (req, res, next) => {
  const { animal_name, org_id, description, location_lat, location_lng } = req.body;
  const { id: userId } = req.user;
  // rescue_pictures
  const pictures = req.files?.map(file => file.filename)
  if (!pictures || !pictures.length) {
    throw new ApiError(400, 'Form', 'Pictures are mandatory');
  }

  try {
    const createdRequest = await Rescues.create(userId, org_id, animal_name, description, location_lat, location_lng, pictures);
    if (createdRequest) {
      return res.status(200).json({ message: 'Form submitted successfully', success: true })
    }
    return res.status(400).json({ message: 'Error submitting form', success: false })
  } catch (err) {
    next(err);
  }

}