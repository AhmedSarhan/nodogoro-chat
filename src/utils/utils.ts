import { Timestamp } from "firebase/firestore";

export const getBanRemovalDate = (stamp?: Timestamp): Date => {
  if (stamp == null) {
    return new Date();
  }
  // adding the expected 48 hours
  const epoch = new Date(stamp.seconds * 1000 + 48 * 60 * 60 * 1000);
  return epoch;
};
