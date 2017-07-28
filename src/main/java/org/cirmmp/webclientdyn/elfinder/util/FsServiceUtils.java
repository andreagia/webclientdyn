package org.cirmmp.webclientdyn.elfinder.util;

import org.cirmmp.webclientdyn.elfinder.controller.executor.FsItemEx;
import org.cirmmp.webclientdyn.elfinder.service.FsItem;
import org.cirmmp.webclientdyn.elfinder.service.FsService;

import java.io.IOException;

public abstract class FsServiceUtils
{
	public static FsItemEx findItem(FsService fsService, String hash)
			throws IOException
	{
		FsItem fsi = fsService.fromHash(hash);
		if (fsi == null)
		{
			return null;
		}

		return new FsItemEx(fsi, fsService);
	}
}
