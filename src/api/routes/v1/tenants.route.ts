import express, { Router } from 'express'
import TenantsController from '@/api/controllers/TenantsController'
import TenantsMongoRepository from '@/modules/tenants/infrastructure/TenantsMongoRepository'
import auth from '@/api/middlewares/authentication'

const router: Router = express.Router()

const controller = new TenantsController(new TenantsMongoRepository())

router
  .route('/')
  .post(auth(), controller.createTenant)

export default router

/**
 * @swagger
 * tags:
 *   name: Tenants
 *   description: Tenant management and retrieval
 */

/**
 * @swagger
 * /tenants:
 *   post:
 *     summary: Create a tenant
 *     description: Only super admins can create tenants.
 *     tags: [Tenants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cdn
 *               - name
 *             properties:
 *               cdn:
 *                 type: string
 *                 description: the company domain name
 *               name:
 *                 type: string
 *                 description: company name
 *             example:
 *               cdn: test.aurora.es
 *               name: Test Company
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Tenant'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "409":
 *         $ref: '#/components/responses/AlreadyExists'
 */
