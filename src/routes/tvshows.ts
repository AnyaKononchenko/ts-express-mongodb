import { Router } from 'express';
import { createTvshow, deleteTvshow, getTvshow, getTvshows, updateTvshow } from '../controllers/tvshowsController';

const router = Router();

router.get('/tvshows', getTvshows)
router.get('/tvshow', getTvshow)
router.put('/tvshow', updateTvshow)
router.post('/tvshows', createTvshow)
router.delete('/tvshow', deleteTvshow)

export default router;
