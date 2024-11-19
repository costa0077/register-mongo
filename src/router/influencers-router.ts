import express from "express";
import InfluencersController from "../controller/influencers-controller";

const influencersRouter = express.Router();

influencersRouter.get("/", InfluencersController.getAllInfluencers);

influencersRouter.post("/", InfluencersController.createInfluencer);

influencersRouter.put("/:id", InfluencersController.updateInfluencer);

influencersRouter.delete("/:id", InfluencersController.deleteInfluencer);

export default influencersRouter;
