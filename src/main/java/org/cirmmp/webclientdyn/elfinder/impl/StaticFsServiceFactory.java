package org.cirmmp.webclientdyn.elfinder.impl;

import org.cirmmp.webclientdyn.elfinder.service.FsService;
import org.cirmmp.webclientdyn.elfinder.service.FsServiceFactory;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

/**
 * A StaticFsServiceFactory always returns one FsService, despite of whatever it
 * is requested
 * 
 * @author bluejoe
 *
 */
public class StaticFsServiceFactory implements FsServiceFactory
{
	FsService _fsService;

	@Override
	public FsService getFileService(HttpServletRequest request,
			ServletContext servletContext)
	{
		return _fsService;
	}

	public FsService getFsService()
	{
		return _fsService;
	}

	public void setFsService(FsService fsService)
	{
		_fsService = fsService;
	}
}
