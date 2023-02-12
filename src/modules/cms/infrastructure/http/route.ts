import path from 'path'
import express, { Router } from 'express'
import config from '../../application/config/config'
import CmsController from './controller'

const router: Router = express.Router()
const controller = new CmsController()

router
  .route('^/admin$')
  .get((_req, res) => {
    res.redirect('./admin/')
  })

router
  .route([ '/admin/*' ])
  .get((req, res) => {
    let fileName = (req.params as Record<string, string>)['0'] || ''
    fileName = fileName === '' ? 'index.html' : fileName
    res.sendfile(path.join(config.cmsModuleDir, '/infrastructure/ui/', fileName))
  })

router
  .route('/doctype')
  .post(controller.createDocType)
  .put(controller.updateDocType)

export default router

/**
 * @swagger
 * tags:
 *   name: CMS
 *   description: Content Management System
 */

/**
 * @swagger
 * /cms/doctype:
 *   post:
 *     summary: Create a DocType
 *     description: Only available in development mode. This will create a new doctype (JS object) and its migration in the defined output path environment variable.
 *     tags: [CMS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewDocType'
 *           examples:
 *             UserDocType:
 *               summary: A new User DocType example
 *               value:
 *                 collectionName: users
 *                 info:
 *                   name: User
 *                   singularName: user
 *                   pluralName: users
 *                 options:
 *                   publish: false
 *                 attributes:
 *                   username:
 *                     type: string
 *                     required: true
 *                     unique: true
 *                   password:
 *                     type: string
 *                     required: true
 *                     caseSensitive: true
 *                   firstName:
 *                     type: string
 *                     required: true
 *                   lastName:
 *                     type: string
 *                     required: true
 *                   email:
 *                     type: string
 *                     required: true
 *                     unique: true
 *                   phone:
 *                     type: string
 *                   roles:
 *                     type: list
 *     responses:
 *       "204":
 *         description: No Content
 *       "409":
 *         $ref: '#/components/responses/AlreadyExists'
 *
 *   put:
 *     summary: Update a DocType
 *     description: Only available in development mode. This will update an existing doctype and creates a new migration with new changes.
 *     tags: [CMS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditDocType'
 *           examples:
 *             UserDocType:
 *               summary: Edit a User DocType example
 *               value:
 *                 referenceId: doctype:73b06e59-15ad-4b92-b7fa-4a53aab32239
 *                 collectionName: users
 *                 info:
 *                   name: User
 *                   singularName: user
 *                   pluralName: users
 *                 options:
 *                   publish: false
 *                 attributes:
 *                   username:
 *                     type: string
 *                     required: true
 *                     unique: true
 *                   password:
 *                     type: string
 *                     required: true
 *                     caseSensitive: true
 *                   firstName:
 *                     type: string
 *                     required: true
 *                   lastName:
 *                     type: string
 *                     required: true
 *                   email:
 *                     type: string
 *                     required: true
 *                     unique: true
 *                   phone:
 *                     type: string
 *                   roles:
 *                     type: list
 *     responses:
 *       "200":
 *         description: No Content
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
